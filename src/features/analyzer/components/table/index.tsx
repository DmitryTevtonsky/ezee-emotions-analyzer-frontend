import { Badge, Table } from 'antd';
import React, { FC, memo } from 'react';

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
  data: any[];
}

const ResultTable: FC<TableProps> = () => {
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
      <div id="result-video-placeholder" />
    </>
  );
};

export default memo(ResultTable);
