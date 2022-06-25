import { Button, Form, Input, Tabs, Upload, message } from 'antd';
import { PlayCircleTwoTone, UploadOutlined, VideoCameraTwoTone } from '@ant-design/icons';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import React, { FC, memo, useState } from 'react';

import { FormFields } from 'types';
import { useAppDispatch } from 'store';

import { sendDataToAnalyzis } from '../../redux/slice';

import css from './index.module.css';

const { TabPane } = Tabs;

const getValueFromEvent = (e: UploadChangeParam) => e && e.file;

const isVideoFile = (file: UploadFile) => file.type?.includes('video');

const Controls: FC = () => {
  const dispatch = useAppDispatch();

  const [activeTabKey, setActiveTabKey] = useState<string>('analyze-form-video-file');

  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>([]);

  const [form] = Form.useForm();

  const handleChangeTab = (tabKey: string) => {
    setActiveTabKey(tabKey);
  };

  const beforeUpload = (file: UploadFile) => {
    console.log(file);
    const isVideo = isVideoFile(file);

    if (!isVideo) {
      message.error('Можно загружать только ВИДЕО файлы!');
      return false;
    }

    return false;
  };

  const handleChangeUpload = ({ fileList }: UploadChangeParam) => {
    if (!fileList.length) {
      form.setFieldsValue({
        videoFile: undefined,
      });
      return setUploadFileList([]);
    }

    const [file] = fileList;
    if (!isVideoFile(file)) return;
    setUploadFileList(fileList);
  };

  const onFinish = (values: FormFields) => {
    if (values.url) {
      const containHttps = values.url.includes('https://');
      const containHttp = values.url.includes('http://');

      if (!containHttp) {
        if (containHttps) return dispatch(sendDataToAnalyzis(values));

        form.setFieldsValue({ url: `https://${values.url}/` });
        return dispatch(sendDataToAnalyzis({ url: `https://${values.url}/` }));
      }

      if (!containHttps) {
        if (containHttp) return dispatch(sendDataToAnalyzis(values));

        form.setFieldsValue({ url: `http://${values.url}/` });
        return dispatch(sendDataToAnalyzis({ url: `http://${values.url}/` }));
      }
      dispatch(sendDataToAnalyzis(values));
    }

    console.log(values);

    dispatch(sendDataToAnalyzis(values));
  };

  return (
    <Tabs
      activeKey={activeTabKey}
      onChange={handleChangeTab}
      tabBarExtraContent={
        <Button type="primary" htmlType="submit" form={activeTabKey}>
          Анализировать
        </Button>
      }
    >
      <TabPane
        tab={
          <span className={css.tabTitle}>
            <PlayCircleTwoTone />
            Видео
          </span>
        }
        key="analyze-form-video-file"
      >
        <Form id="analyze-form-video-file" form={form} className={css.form} onFinish={onFinish}>
          <Form.Item
            name="video"
            valuePropName="file"
            getValueFromEvent={getValueFromEvent}
            rules={[{ required: true, message: 'Выберите видео для анализа!' }]}
          >
            <Upload
              className={css.upload}
              beforeUpload={beforeUpload}
              onChange={handleChangeUpload}
              maxCount={1}
              listType="picture"
              fileList={uploadFileList}
            >
              <Button icon={<UploadOutlined />}>Загрузить</Button>
            </Upload>
          </Form.Item>
        </Form>
      </TabPane>
      <TabPane
        tab={
          <span className={css.tabTitle}>
            <VideoCameraTwoTone />
            URL на потоковое видео
          </span>
        }
        key="analyze-form-video-url"
      >
        <Form id="analyze-form-video-url" className={css.form} onFinish={onFinish} form={form}>
          <Form.Item name="url" rules={[{ required: true, message: 'Введите URL на потоковое видео!' }]}>
            <Input size="large" placeholder="URL на потоковое видео" />
          </Form.Item>
        </Form>
      </TabPane>
    </Tabs>
  );
};

export default memo(Controls);
