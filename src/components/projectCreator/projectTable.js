import React from 'react';
import MaterialTable from 'material-table';
import ProjectDetails from './projectDetails';

export default function ProjectTable(props) {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Project Name', field: 'name' },
      { title: 'Scrum Team', field: 'scrumTeam' },
      { title: 'Risk Analysis', field: 'riskAnalysis' }
    ],
    data: [
      {
        name: 'Group Workspace M2',
        scrumTeam: 'VHS',
        riskAnalysis: 'http://localhost:3001'
      },
      {
        name: 'Bulk Download',
        scrumTeam: 'VHS',
        riskAnalysis: '/teams'
      },
      { name: 'Ultra MonoRepo', scrumTeam: 'PVC', riskAnalysis: '/home' }
    ]
  });

  return (
    <MaterialTable
      columns={state.columns}
      data={state.data}
      options={{
        showTitle: false,
        actionsColumnIndex: -1
      }}
      detailPanel={rowData => {
        return (
          <ProjectDetails
            name={rowData.name}
            dpLink={rowData.riskAnalysis}
            description={
              'Two Travellers, walking in the noonday sun, sought the shade of a widespreading tree to rest. As they lay looking up among the pleasant leaves, they saw that it was a Plane Tree.'
            }
          />
        );
      }}
      onRowClick={(event, rowData, togglePanel) => togglePanel()}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          })
      }}
    />
  );
}
