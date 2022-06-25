import { AnalyzeInitialData } from 'types';
import { Badge, Table } from 'antd';
import React, { FC, memo, useEffect } from 'react';

const { Column } = Table;

const fakeData: any[] = [
  {
    id: '1',
    fullName: 'Иванов М.Н.',
    class: '7Б',
    emotion: 'processing',
  },
  {
    id: '2',
    fullName: 'Сидоров К.В.',
    class: '7Б',
    emotion: 'processing',
  },
  {
    id: '3',
    fullName: 'Петрова Е.В.',
    class: '7Б',
    emotion: 'processing',
  },
];

interface TableProps {
  data: AnalyzeInitialData;
}

const ResultTable: FC<TableProps> = ({ data }: TableProps) => {
  useEffect(() => {
    try {
      console.log(data);
      const fileName = data.pathToOutputVideo.split('/').pop();

      const resultVideoPlaceholder = document.getElementById('result-video-placeholder');

      const video = document.createElement('video');
      video.setAttribute('controls', 'true');
      video.setAttribute('crossorigin', 'true');
      video.autoplay = true;
      video.controls = true;
      video.muted = true;

      const source = document.createElement('source');
      source.setAttribute('src', `http://84.252.137.43:3000/output/${fileName}`);
      source.setAttribute('type', `video/webm`);

      video.appendChild(source);
      console.log({ data, resultVideoPlaceholder, video });

      video.addEventListener('error', (e) => console.log(e), { once: true });

      resultVideoPlaceholder?.appendChild(video);
    } catch (error) {
      console.log('!!', error);
    }
  }, [data]);

  return (
    <>
      <Table dataSource={fakeData} rowKey="id">
        <Table.Column title="ID ученика" dataIndex="id" key="id" />

        <Column title="ФИО" dataIndex="fullName" key="fullName" />
        <Column title="Класс" dataIndex="class" key="class" />
        <Column
          title="Доминирующая эмоция"
          dataIndex="emotion"
          key="emotion"
          render={(emotion: string) => (
            <>
              <Badge status={emotion as any} />
              Обработка
            </>
          )}
        />
        <Column title="Действия" key="action" render={(_: any) => <a href="/#">Подробнее</a>} />
      </Table>
      <div id="result-video-placeholder" style={{ height: '500px', width: '100%' }}>
        Видео:
      </div>
    </>
  );
};

export default memo(ResultTable);
