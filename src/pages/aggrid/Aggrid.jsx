import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
//import 'ag-grid-community/styles/ag-theme-alpine-dark.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
//import 'ag-grid-community/styles/ag-theme-balham-dark.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Grid, Button } from '@material-ui/core';
import FormDialog from '../aggrid/dialog';
import Form from 'react-bootstrap/Form';
import Navbar from '../../component/navbar/Navbar';
import Footer from '../../component/footer/Footer';
import { clearLocalStorage, getLocalStorage, setLocalStorage } from "C:/github2/MyGrid/src/pages/utility.js";
import "./aggrid.css"
import {LicenseManager} from "ag-grid-enterprise";
LicenseManager.setLicenseKey("CompanyName=EvaluationKey,LicensedGroup=Multi,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=0,AssetReference=AG-0,ExpiryDate=13_March2023[v2]_MTY3ODY2NTYwMDAwMA==bdcda07fe581ca15b2a010bbef2b2513");
const App = () => {
 
  const initialvalue = { id_grille:"",nom_grille: "", taille_grille: "", couleur_fond_grille: "",id_col:"" };
  const initialvalue_colonne={id_colonne:"",nom_colonne:"",largeur_colonne:"",couleur_colonne:""};
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [gridApi, setGridApi] = useState(null);
  const [tableData, settableData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const url = "http://localhost:4000/api/Grid_masters"
  const [formData, setformData] = useState(initialvalue);
  const[formData_colonne,setformData_colonne]=useState(initialvalue_colonne);
  const [open, setOpen] = React.useState(false);
  const [theme, setTheme] = useState('alpine');
  const [gridConfigs, setGridConfigs] = useState([]);
  const [gridData, setGridData] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setformData(initialvalue);
  };


  // Each Column Definition results in one Column.
  
  const [columnDefs, setColumnDefs] = useState([
    { headerName: "id_grille", field: 'id_grille', cellRenderer: 'agGroupCellRenderer' },
    { headerName: "nom_grille", field: 'nom_grille' },
    { headerName: "taille_grille", field: 'taille_grille' },
    { headerName: "couleur_fond_grille", field: 'couleur_fond_grille' },
    {
      headerName: "Actions", field: "id_grille", cellRendererFramework: (params) => <div >
        <Button variant="outlined" color="primary" onClick={() => handleUpdate(params.data)}>modifier</Button>
        <Button variant="outlined" color="secondary" onClick={() => handleDelete(params.value)}>supprimer</Button>
      </div>
    },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    flex :1,
    width: 110,
    cellClassRules: {
      greenBackground: (params) => {
        return params.value;
      }
    },
   /* filterParams: {
      buttons: ['apply', 'clear', 'cancel', 'reset']
    },*/
    floatingFilter: true,
    enableRowGroup: true, //aka lfaza te3 drag here to set a row groups
    resizable: true,
    accentedSort: true,// pour prendre en consideration les symboles et les caracteres spéciales 
    animateRows: true,
    // suppressMovable:true mouvement imposible pour les colonnes 
    enablePivot: true,
  }));

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        columnDefs: [
          { field: 'nom_colonne' },
          { field: 'largeur_colonne', minWidth: 150 },
          { field: 'couleur_colonne' },
        ],
        defaultColDef: {
          flex: 1,
          rowSelection: 'single',
        },
      },
      getDetailRowData: (params) => {
       
        fetch(`http://localhost:4000/api/Colonne_master/${params.data.id_col}`)
          .then((resp) => resp.json())
          .then((data) => params.successCallback(data));
      },
    };
  }, []);



  // Example using Grid's API
  const buttonListener = useCallback(e => {
    gridRef.current.api.deselectAll();
  }, []);


  useEffect(() => {
    getUsers();
  }, [])

  


  const getUsers = () => {
    fetch(url).then(resp => resp.json()).then(resp => settableData(resp))

  }

  
  const onChange = (e) => {
    const { value, id} = e.target
    // console.log(value,id)
    setformData({ ...formData, [id]: value })
  }
  const handleFormSubmit = () => {
    if (formData.id) {
      try{ 
      //updating a user 
     // console.log(error.message)
      const confirm = window.confirm("Are you sure, you want to update this row ?")
      confirm && fetch(url + `/${formData.id}`, {
        method: "PUT", body: JSON.stringify(formData), headers: {
          'content-type': "application/json",
          mode: 'no-cors'
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()

        })
      } catch (error) {
        console.log(error.message);
      }} else {
      // adding new user
      try{ 
      fetch(url, {
        method: "POST", body: JSON.stringify(formData), headers: {
         // 'Accept': 'application/json',
          'content-type': "application/json",
         mode: 'no-cors'
        }
      }).then(resp => resp.json())
        .then(resp => {
          handleClose()
          getUsers()
        })
    } catch (error) {
  console.log(error.message);
}}}
  // setting update row data to form data and opening pop up window
  const handleUpdate = (oldData) => {
    setformData(oldData)
    handleClickOpen()
  }

    //delete users 
    const handleDelete = (id) => {
      const confirm = window.confirm("Are you sure, you want to delete this row", id)
      if (confirm) {
        fetch(url + `/${id}`, { method: "DELETE" }).then(resp => resp.json()).then(resp => getUsers())
  
      }
    }
 /* const onGridReady = useCallback((params) => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        settableData(data);
      });
  }, []);
*/
  const onGridReady = (params) => {
    console.log("grid is ready");
    setGridApi(params);
    restoreState(params);
    params.api.sizeColumnsToFit();
    /*fetch("http://localhost:4000/api/Grid_masters/").then(Resp=>Resp.json())
     .then(resp=>params.api.applyTransaction({add:resp}))//add new data to grid*/
  }
  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel();
  }, []);
  
// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new Grid.Grid(gridDiv, formData);

  fetch(url)
    .then((response) => response.json())
    .then(function (data) {
      formData.api.setRowData(data);
    });
});
// pour enregister l'etat de la table 
const saveState = () => {
  const colState = gridApi.columnApi.getColumnState();
  setLocalStorage(colState);
  closeSidebarToolpanel();
  console.log("column state saved");
};
// pour restorer l'etat precedent de la table 
const restoreState = (params) => {
  const colState = getLocalStorage();
  if (!colState) {
    console.log("no columns state to restore by, you must save state first");
    return;
  }
  params.columnApi.applyColumnState({
    state: colState,
    applyOrder: true,
  });
  closeSidebarToolpanel();
  console.log("column state restored");
};
// rendre la table à l'etat initiale
const resetState = () => {
  gridApi.columnApi.resetColumnState();
  clearLocalStorage();
  closeSidebarToolpanel();
  console.log("column state reset");
};
const closeSidebarToolpanel = () => [gridApi.api.closeToolPanel()];
  // Dupliquer le grille avec le meme etat 
  const [numberOfCopies, setNumberOfCopies] = useState(0);


  const duplicateGrids = () => {
    const grids = [];
    for (let i = 0; i < numberOfCopies; i++) {
      grids.push(
        <div
          key={i}
          className="ag-theme-alpine"  style={{ width: 1300, height: 400 }}
        >
          <AgGridReact
            //={rowData}
            rowData={tableData}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
            defaultColDef={defaultColDef}
            sideBar={{
              toolPanels: [
                {
                  id: "columns",
                  labelDefault: "Columns",
                  iconKey: "columns",
                  toolPanel: "agColumnsToolPanel",
                },
    
                {
                  id: "save",
                  labelDefault: "Save",
                  iconKey: "menu",
                  toolPanel: () => (
                  
    
                      <div style={{ marginTop: 20 ,width:70 ,height:150, marginBottom: 10 , marginLeft: 55  }}>
                      <button onClick={saveState}>Save State</button><br /><br />
                      <button onClick={() => restoreState(gridApi)}>
                        Restore State
                      </button><br /><br />
                      <button onClick={resetState}>Reset State</button>
                    </div>
    
                  ),
                },
                {
                  id: "Export",
                  labelDefault: "Export",
                  iconKey: "menu",
                  toolPanel: () => (
                    <div style={{ marginTop: 20 }}>
                      <button onClick={onBtExport}>Download</button>
                    </div>
    
                  ),
                },
              ],
            }}
          />
        </div>
      );
    }
    return grids;
  };

  const handleDuplicateButtonClick = () => {
    setNumberOfCopies(numberOfCopies + 1);
    setGridConfigs([...gridConfigs, columnDefs]);
    setGridData([...gridData, tableData.slice()]);
  };



const duplicateColumn = () => {
  const existingColumn = columnDefs.find(colDef => colDef.field === formData.id_col);
  const newColumn = { ...existingColumn, headerName: formData.id_col + ' copie', field: formData.id_col + 'Copie' };
  setColumnDefs([...columnDefs, newColumn]);
  const newRowData = tableData.map(row => {
    return { ...row, [formData.id_col + 'Copie']: row[formData.id_col] }
  });
  settableData(newRowData);
}

const handleInputChange = event => {
  const { name, value } = event.target;
  setformData({ ...formData, [name]: value });
}
  
return (
  <div >
    <Navbar/>
    {/* Example using Grid's API */}
   
    <div className="button-container" >
      <Button  variant="contained" onClick={handleDuplicateButtonClick}>
        Duppliquer le tableau
      </Button>
       <Form.Select aria-label="Default select example" onClick={e => setTheme(e.target.value)}>
        <option disabled>{' '}- Theme -</option>
        <option value="alpine">alpine</option>
        <option value="alpine-dark">alpine-dark</option>
        <option value="balham">balham</option>
        <option value="balham-dark">balham-dark</option>
        <option value="material">material</option>
      </Form.Select>
     
      <Button variant="contained" color="primary" onClick={handleClickOpen}>Add user</Button>
      <input type="text" name="id_col" value={formData.id_col} onChange={handleInputChange} />
      <button onClick={duplicateColumn}>Dupliquer la colonne</button>
      </div>

    {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
    <div align="center" className={`ag-theme-${theme} `} style={{ width: 1350, height: 500 }}>
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          masterDetail={true}
          detailCellRendererParams={detailCellRendererParams}

          rowData={tableData} // Row Data for Rows
          onGridReady={onGridReady}
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection='multiple' // Options - allows click selection of rows
        //onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        sideBar={{
          toolPanels: [
            {
              id: "columns",
              labelDefault: "Columns",
              iconKey: "columns",
              toolPanel: "agColumnsToolPanel",
            },

            {
              id: "save",
              labelDefault: "Save",
              iconKey: "menu",
              toolPanel: () => (
              

                  <div style={{ marginTop: 100 ,marginLeft:60,  textAlign: "center" }} >
                  <button class="medium" onClick={saveState}>Save State</button><br /><br />
                  <button class="medium" onClick={() => restoreState(gridApi)}>
                    Restore State
                  </button><br /><br />
                  <button class="medium" onClick={resetState}>Reset State</button>
                </div>

              ),
            },
            {
              id: "Export",
              labelDefault: "Export",
              iconKey: "menu",
              toolPanel: () => (
                <div  style={{ marginTop: 100 ,marginLeft:60,  textAlign: "center" }} >
                  <button class="medium" onClick={onBtExport}>Download</button>
                </div>

              ),
            },
          ],
        }}
        
        />
      </div>
      {duplicateGrids()}
      <FormDialog open={open} handleClose={handleClose} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
      <Footer/>
    </div>
  );
};

export default App;
