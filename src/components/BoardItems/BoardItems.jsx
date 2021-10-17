import React, { useState } from 'react';
import './Boards.scss';
import AddButton from '../AddButton/AddButton.jsx';

const Boards = () => {
    const [stateBoards, setStateBoards] = useState([
        { id: 1, title: 'Done 1', items: [{ id: 1, title: 'Make money 1' }, { id: 2, title: 'Make money 2' }, { id: 3, title: 'Make money 3' }] },
        { id: 2, title: 'Done 2', items: [{ id: 4, title: 'Make money 4' }, { id: 5, title: 'Make money 5' }, { id: 6, title: 'Make money 6' }] },
        { id: 3, title: 'Done 3', items: [{ id: 7, title: 'Make money 7' }, { id: 8, title: 'Make money 8' }, { id: 9, title: 'Make money 9' }] }
    ]);

    const [currentBoardIndex, setCurrentBoardIndex] = useState(null);
    const [currentItemIndex, setCurrentItemIndex] = useState(null);
    const [startClassElement, setStartClassElement] = useState(null);
    const [dropClassElement, setDropClassElement] = useState(null);


    
        function dragStartListener(e, props) {
            e.stopPropagation();
            setCurrentBoardIndex(props.stateBoardIndex);
            setCurrentItemIndex(props.itemIndex);
            setStartClassElement(e.target.className);
        }
        function dragLeaveListener(e) {            
            e.target.style.boxShadow = 'none';
            e.stopPropagation();             
        }

        function dragEndListener(e) {            
            e.target.style.boxShadow = 'none';
        }

        function dragOverListener(e) {
            e.preventDefault();   
            e.stopPropagation();          
            if (e.target.className === 'board' || e.target.className === 'board__item') {
                e.target.style.boxShadow = '0 2px 3px gray';
            }
            setDropClassElement(e.target.className)
        }

        function dropListener(e, dropBoard) {
            e.preventDefault();
            e.stopPropagation(); 
            e.target.style.boxShadow = 'none';                    
            setStateBoards(oldStateBoards => {
                if (startClassElement === 'board__item' && dropClassElement === 'board__item') {
                    let newStateBoards = JSON.parse(JSON.stringify(oldStateBoards));
                    newStateBoards[dropBoard.stateBoardIndex].items.splice(dropBoard.itemIndex, 0, newStateBoards[currentBoardIndex].items.splice(currentItemIndex, 1)[0]);                    
                    return newStateBoards;
                } 
                if (startClassElement === 'board__item' && dropClassElement === 'board') {
                    let newStateBoards = JSON.parse(JSON.stringify(oldStateBoards));
                    newStateBoards[dropBoard.stateBoardIndex].items.push(newStateBoards[currentBoardIndex].items.splice(currentItemIndex, 1));                    
                    return newStateBoards;
                }                
                return oldStateBoards
            }) 
            setCurrentBoardIndex(null);
            setCurrentItemIndex(null);
            setDropClassElement(null);            
        }

        function dragStartBoardListener(e, stateBoardIndex) {
            setCurrentBoardIndex(stateBoardIndex);
            setStartClassElement(e.target.className);          
        }

        function dragLeaveBoardListener(e) {

        }

        function dragEndBoardListener(e) {
            
        }

        function dragOverBoardListener(e) {
            e.preventDefault();            
            setDropClassElement(e.target.className);
            console.log('board')
        }

        function dropBoardListener(e, stateBoardIndex) {
            e.preventDefault();            
            e.target.style.boxShadow = 'none';
            setStateBoards(oldStateBoards => {
                if (startClassElement === 'board' && dropClassElement === 'board') {
                    let newStateBoards = JSON.parse(JSON.stringify(oldStateBoards));
                    newStateBoards.splice(stateBoardIndex, 0, newStateBoards.splice(currentBoardIndex, 1)[0]);
                    console.log('bord was removed');
                    return newStateBoards;
                }
                return oldStateBoards;
            })
            setDropClassElement(null);
        }

        function onDeleteItem(e, deletedItem) {
            e.preventDefault();            
            setStateBoards(oldStateBoards => {
                let newStateBoards = JSON.parse(JSON.stringify(oldStateBoards));
                newStateBoards[deletedItem.stateBoardIndex].items.splice(deletedItem.itemIndex, 1);
                return newStateBoards;
            });
        }

        function onDeleteBoard(e, stateBoardIndex) {
            e.preventDefault();
            setStateBoards(oldStateBoards => {
                let newStateBoards = JSON.parse(JSON.stringify(oldStateBoards));
                newStateBoards.splice(stateBoardIndex, 1);
                return newStateBoards;
            });
        }

        const onAddBoard = (newTitle) => {             
            const newBoard = {id: null, title: newTitle, items: []};
            setStateBoards(oldStateBoards => {
                let newStateBoards = JSON.parse(JSON.stringify(oldStateBoards));
                newStateBoards.push(newBoard);
                return newStateBoards;
            })            
        }

        const onAddCard = (stateBoardInex, textareaValue) => {
            const newCard = { id: 1, title: textareaValue };
            setStateBoards(oldStateBoards => {
                let newStateBoards = JSON.parse(JSON.stringify(oldStateBoards));
                newStateBoards[stateBoardInex].items.push(newCard);
                return newStateBoards;
            })    
        }


        return (
            <div className="app">
                {stateBoards.map((stateBoard, stateBoardIndex) => {
                    return (
                        <div
                            className="board"
                            draggable={true}
                            onDragStart={(e) => {
                                dragStartBoardListener(e, stateBoardIndex)
                            }}
                            onDragLeave={(e) => {
                                dragLeaveBoardListener(e)
                            }}
                            onDragEnd={(e) => {
                                dragEndBoardListener(e)
                            }}
                            onDragOver={(e) => {
                                dragOverBoardListener(e)
                            }}
                            onDrop={(e) => {
                                dropBoardListener(e, stateBoardIndex)
                            }}
                        >
                            <div className="board__title">
                                {stateBoard.title}
                            </div>
                            <button
                            className="board__btn-delete-card"
                            onClick={(e) => {
                                onDeleteBoard(e, stateBoardIndex)
                            }}
                            >X</button>
                            {stateBoard.items.map((item, itemIndex) => {
                                return (                                
                                    <div
                                        draggable={true}
                                        className="board__item"
                                        onDragStart={(e) => {
                                            dragStartListener(e, { stateBoardIndex, itemIndex })
                                        }}
                                        onDragLeave={(e) => {
                                            dragLeaveListener(e)
                                        }}
                                        onDragEnd={(e) => {
                                            dragEndListener(e)
                                        }}
                                        onDragOver={(e) => {
                                            dragOverListener(e)
                                        }}
                                        onDrop={(e) => { dropListener(e, { item, stateBoardIndex, itemIndex }) }}
                                    >
                                        {item.title}
                                        <button
                                        className="item__btn-delete-item"
                                        onClick={(e) => {
                                            onDeleteItem(e, {stateBoardIndex, itemIndex})
                                        }}
                                        >X</button>
                                    </div>                                    
                                )
                            })}
                             <AddButton 
                            card={true}
                            onAddCard={onAddCard}
                            stateBoardIndex={stateBoardIndex}
                            />
                        </div>
                    )
                })}
               <AddButton 
               card={false}
               onAddBoard={onAddBoard}
               />
            </div>
        );
    }

export default Boards;