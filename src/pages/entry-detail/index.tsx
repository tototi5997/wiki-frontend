import { useEffect } from 'react'
import { useEntry } from "@/state/entry/hook";
import { Button } from 'antd'
import Icon from '@/components/icon';
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import c from 'classnames'
import s from './index.module.less'

const EntryDetail = () => {
  const { onEntryDetail, entryDetail } = useEntry();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get('id');

  useEffect(() => {
    if(id) {
      onEntryDetail.mutate(id)
    }
  }, [id])

  // 返回
  const onBack = () => {
    navigate('/home')
  }

  return (
    <div className={c(s['entry-detail-wrapper'], 'relative fbh fbjc fbac')}>
      <div className={s.content}>
        <Button color="primary" variant="link" size="large" icon={<Icon name="left-arrow" />} onClick={onBack} >
          返 回
        </Button>
        <div className={s['detail-title']}>{entryDetail.title}</div>
        <div className={c(s['detail-creator'], 'fbh fbje')}>
          <div className={c(s['base-info'], 'fbh')}>
            <span>创建人：</span>
            <span>{entryDetail.creator?.username}</span>
          </div>
          <div className={c(s['base-info'], 'fbh')}>
            <span>创建时间：</span>
            <span>{entryDetail.created_at ? dayjs(entryDetail.created_at).format("YYYY-MM-DD hh:mm:ss") : '-'}</span>
          </div>
        </div>
        <div className={s['detail-img']}>
          <img src={entryDetail.cover_image} alt="" />
        </div>
        <div className={s['entry-content']} dangerouslySetInnerHTML={{ __html: entryDetail.content }}></div>
      </div>
    </div>
  )
}
export default EntryDetail
