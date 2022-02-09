import React, { useState, useEffect } from 'react';
import marvelData from './api/marvel';
import './index.css'
import DataGrid, { Column, Scrolling, Pager, Paging, FilterRow, HeaderFilter, SearchPanel, Selection, Export } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.material.teal.dark.css';
import { useNavigate } from 'react-router-dom';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';

const allowedPageSizes = [10, 15, 20, 25, 50];
const CharacterList = () => {
    let navigate = useNavigate();
    const [characters, setCharacters] = useState([]);
    useEffect(() => {
        searchData();

    }, []);
    const searchData = async () => {
        const response = await marvelData.get('v1/public/characters');
        setCharacters(response.data.data.results);
    }
    const onExporting = (e) => {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Main sheet');

        exportDataGrid({
            component: e.component,
            worksheet,
            autoFilterEnabled: true,
            topLeftCell: { row: 4, column: 1 },
            customizeCell: ({ gridCell, excelCell }) => {
                if (gridCell.rowType === 'data') {
                    if (gridCell.column.dataField === 'thumbnail.path') {
                        excelCell.value = undefined;
                        // console.log(gridCell);
                        const image = workbook.addImage({
                            base64: `${gridCell.value}/portrait_small`,
                            extension: 'png',
                        });

                        worksheet.getRow(excelCell.row).height = 90;
                        worksheet.addImage(image, {
                            tl: { col: excelCell.col - 1, row: excelCell.row - 1 },
                            br: { col: excelCell.col, row: excelCell.row },
                        });
                    }
                }
            },
        }).then((cellRange) => {
            // header
            const headerRow = worksheet.getRow(2);
            headerRow.height = 30;
            worksheet.mergeCells(2, 1, 2, 8);

            headerRow.getCell(1).value = 'Marvel Characters List';
            headerRow.getCell(1).font = { name: 'Segoe UI Light', size: 22 };
            headerRow.getCell(1).alignment = { horizontal: 'center' };
        })
            .then(() => {
                workbook.xlsx.writeBuffer().then((buffer) => {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
                });
            });
        e.cancel = true;
    }
    const renderGridCell = (cellData) => {
        return (<div><img src={`${cellData.value}/standard_xlarge.jpg`} width="auto" alt={`${cellData.data.name}`}></img></div>);
    }
    const onSelectionChanged = ({ selectedRowsData }) => {
        const data = selectedRowsData[0];
        navigate(`/${data.id}`, { characterId: data.id })
    }
    return (
        <div>
            <h2 className='heading'>
                <img src={window.location.origin + '/Marvel_Logo.jpg'} alt='Marvel' width="10%" />
                {/* Marvel Character List */}
            </h2>
            <DataGrid dataSource={characters} id="gridContainer" keyExpr="id"
                columnAutoWidth={true}
                showBorders={true}
                // rowAlternationEnabled={true}
                hoverStateEnabled={true}
                onSelectionChanged={onSelectionChanged}
                onExporting={onExporting}
            >
                <Selection mode="single" />
                <FilterRow visible={true}
                // applyFilter={this.state.currentFilter}
                />
                <HeaderFilter visible={true} />
                <SearchPanel visible={true}
                    width={240}
                    placeholder="Search..." />
                <Column caption="Character" dataField="thumbnail.path"
                    width="auto" allowFiltering={false} allowSorting={false}
                    cellRender={renderGridCell} />
                <Column dataField="name" width="auto" caption="Name" />
                <Column dataField="description" caption="Description" width="40%" />
                <Scrolling ></Scrolling>
                <Paging defaultPageSize={10} />
                <Pager
                    visible={true}
                    allowedPageSizes={allowedPageSizes}
                    displayMode="full"
                    showPageSizeSelector={true}
                    showInfo={true}
                    alignContent={true} />
                <Export enabled={true} />
            </DataGrid>
        </div>
    )
}

export default CharacterList;
