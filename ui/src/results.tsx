import React from 'react';

const keys: string[] = [
  'name',
  'count',
  'favoriate number',
  'host name',
  'process',
];

const labels: {[x: string]: string} = {
  name: 'Query',
  count: 'Query Count',
  'favoriate number': 'Ideal Favoriate Number',
  'host name': 'Container',
  process: 'Process ID',
};

export interface data {
  [x: string]: string;
  Name: string;
  'favorite-number': string;
}

function Results(props: {data: data}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>

      <tbody>
        {keys.map(key => (
          <tr>
            <td>{labels[key]}</td>
            <td>{props.data[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Results;
