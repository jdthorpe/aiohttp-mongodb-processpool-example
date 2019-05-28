import React, {Component} from 'react';

const keys: string[] = ['Name', 'favorite-number'];

export interface data {
	[x:string]:string
	Name:string
	'favorite-number':string
}



function Results(props: { data: data }) {
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
            <td>{key}</td>
            <td>{props.data[key]}</td>
          </tr>
		))}
      </tbody>
    </table>
  );
}

export default Results;
