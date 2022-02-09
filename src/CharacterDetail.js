import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import marvelData from './api/marvel';
import './index.css'
import DataGrid, { Column, Scrolling, Pager, Paging, FilterRow, HeaderFilter, SearchPanel, Selection } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.material.teal.dark.css';

const CharacterDetail = () => {
    const allowedPageSizes = [10, 15, 20, 25, 50];
    let { id } = useParams();
    const [character, setCharacter] = useState([]);
    const [characterStories, setCharacterStories] = useState([]);
    const [characterEvent, setCharacterEvent] = useState([]);
    const [characterSeries, setCharacterSeries] = useState([]);
    useEffect(() => {
        searchData(id);
    }, [id]);

    const searchData = async (id) => {
        const response = await marvelData.get(`v1/public/characters/${id}`);
        setCharacter(response.data.data.results[0]);

        const responseStories = await marvelData.get(`v1/public/characters/${id}/stories`);
        setCharacterStories(responseStories.data.data.results);

        const responseEvent = await marvelData.get(`v1/public/characters/${id}/events`);
        setCharacterEvent(responseEvent.data.data.results);

        const responseSeries = await marvelData.get(`v1/public/characters/${id}/series`);
        setCharacterSeries(responseSeries.data.data.results);

    }
    return (
        <div>
            <div>
                <div className="flex-container">
                    <div className="flex-item-left"><img src={`${character.thumbnail?.path}/detail.jpg`} alt={`${character.name}`} /></div>
                    <div className="flex-item-right"> <h3>{character.name}</h3>
                        <p>{character.description}</p>
                    </div>
                </div>


            </div>
            <h2 className='heading'>Stories</h2>
            <DataGrid dataSource={characterStories}
                id="gridContainer"
                keyExpr="id"
                columnAutoWidth={true}
                showBorders={true}
                noDataText="No Data Available"
                // rowAlternationEnabled={true}
                hoverStateEnabled={true}
            >
                <Selection mode="single" />
                <FilterRow visible={true}
                />
                <HeaderFilter visible={true} />
                <SearchPanel visible={true}
                    width={240}
                    placeholder="Search..." />

                <Column dataField="title" width="auto" caption="Title" />
                <Column dataField="description" noDataText="No Data Available" caption="Description" width="40%" />
                <Scrolling></Scrolling>
                <Paging defaultPageSize={10} />
                <Pager
                    visible={true}
                    allowedPageSizes={allowedPageSizes}
                    displayMode="full"
                    showPageSizeSelector={true}
                    showInfo={true}
                    alignContent={true} />

            </DataGrid>
            <h2 className='heading'>Events</h2>
            <DataGrid dataSource={characterEvent}
                id="gridContainer"
                keyExpr="id"
                columnAutoWidth={true}
                showBorders={true}
                noDataText="No Data Available"
                // rowAlternationEnabled={true}
                hoverStateEnabled={true}
            >
                <Selection mode="single" />
                <FilterRow visible={true}
                />
                <HeaderFilter visible={true} />
                <SearchPanel visible={true}
                    width={240}
                    placeholder="Search..." />

                <Column dataField="title" width="auto" caption="Title" />
                <Column dataField="description" noDataText="No Data Available" caption="Description" width="40%" />
                <Scrolling ></Scrolling>
                <Paging defaultPageSize={10} />
                <Pager
                    visible={true}
                    allowedPageSizes={allowedPageSizes}
                    displayMode="full"
                    showPageSizeSelector={true}
                    showInfo={true}
                    alignContent={true} />
            </DataGrid>
            <h2 className='heading'>Series</h2>
            <DataGrid dataSource={characterSeries}
                id="gridContainer"
                keyExpr="id"
                columnAutoWidth={true}
                showBorders={true}
                noDataText="No Data Available"
                // rowAlternationEnabled={true}
                hoverStateEnabled={true}
            >
                <Selection mode="single" />
                <FilterRow visible={true}
                />
                <HeaderFilter visible={true} />
                <SearchPanel visible={true}
                    width={240}
                    placeholder="Search..." />

                <Column dataField="title" width="auto" caption="Title" />
                <Column dataField="description" noDataText="No Data Available" caption="Description" width="40%" />
                <Scrolling ></Scrolling>
                <Paging defaultPageSize={10} />
                <Pager
                    visible={true}
                    allowedPageSizes={allowedPageSizes}
                    displayMode="full"
                    showPageSizeSelector={true}
                    showInfo={true}
                    alignContent={true} />
            </DataGrid>
        </div>
    );
}

export default CharacterDetail;