import c from "classnames";
import s from "./index.module.less";
import { Button, Form, Input, message, Select } from "antd";
import { useAllEntries } from "@/state/entry/hook";
import { useForm } from "antd/es/form/Form";
import useModal from "@/hooks/useModal";
import { useCreateTask } from "@/state/task/hook";
import { useQueryClient } from "@tanstack/react-query";

const CreateTaskModal = () => {
  const queryClient = useQueryClient();

  const { data: listData } = useAllEntries({});

  const { entries } = listData ?? {};

  const [fromRef] = useForm();

  const modal = useModal();

  const { createNewTask } = useCreateTask(() => {
    modal?.hide();
    message?.success("任务创建成功");
    queryClient.invalidateQueries({ queryKey: ["all-tasks"] });
  });

  const getNoTaskEntries = () => {
    return entries?.filter((e) => !e.task).map((i) => ({ label: i.title, value: i.id }));
  };

  const handleCancel = () => {
    modal?.hide();
  };

  const handleCreateTask = async () => {
    const values = await fromRef?.validateFields();
    createNewTask.mutate(values);
  };

  return (
    <div className={c(s.create_task_modal)}>
      <div className={s.content}>
        <div className={s.title}>创建任务</div>
        <Form className="mt-30" labelCol={{ style: { width: 80 } }} form={fromRef}>
          <Form.Item name="title" label="任务标题" rules={[{ required: true, message: "请输入任务标题" }]}>
            <Input placeholder="请输入任务标题" />
          </Form.Item>
          <Form.Item name="entryId" label="关联词条" rules={[{ required: true, message: "请选择关联词条" }]}>
            <Select placeholder="选择一个词条相关联" options={getNoTaskEntries() ?? []} />
          </Form.Item>
          <Form.Item name="description" label="任务描述">
            <Input.TextArea placeholder="任务详细的描述，要求等" />
          </Form.Item>
          <div className="fbh fbac gap-20 fbje mt-30">
            <Button type="primary" onClick={handleCreateTask}>
              创建
            </Button>
            <Button onClick={handleCancel}>取消</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
