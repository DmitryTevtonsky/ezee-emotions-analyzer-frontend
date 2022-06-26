import { AnalyzeInitialData } from 'types';
import { Table } from 'antd';
import React, { FC, memo, useEffect } from 'react';

import { selectAnalyzisData } from 'features/analyzer/redux/selectors';
import { useAppSelector } from 'store';
import css from './index.module.css';

const { Column } = Table;

const fakeData: any[] = [
  {
    id: '1',
    fullName: 'Ученик/ученица',
    class: '7Б',
    emotion: 'processing',
  },
];

interface TableProps {
  data: AnalyzeInitialData;
}

const ResultTable: FC<TableProps> = ({ data }: TableProps) => {
  const dominantEmotion = useAppSelector(selectAnalyzisData);
  useEffect(() => {
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
  }, [data]);

  console.log({ dominantEmotion });

  return (
    <>
      <Table dataSource={fakeData} rowKey="id" pagination={false}>
        <Table.Column title="ID ученика" dataIndex="id" key="id" />

        <Column title="ФИО" dataIndex="fullName" key="fullName" />
        <Column title="Класс" dataIndex="class" key="class" />
        <Column
          title="Доминирующая эмоция"
          dataIndex="emotion"
          key="emotion"
          render={() => <>{`${dominantEmotion?.emotion} (${dominantEmotion?.value})`}</>}
        />
        <Column title="Действия" key="action" render={(_: any) => <a href="/#">Подробнее</a>} />
      </Table>
      <div id="result-video-placeholder" className={css.resultVideoPlaceholder}>
        Видео c результатом анализа:
      </div>
    </>
  );
};

export default memo(ResultTable);
