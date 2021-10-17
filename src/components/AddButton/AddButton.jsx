import React, { useState } from 'react';
import './AddButton.scss'

const AddButton = ({ card, onAddBoard, onAddCard, stateBoardIndex }) => {

    const [formState, setFormState] = useState(false);
    const [textareaValue, setTextareaValue] = useState('');

    const buttonTitle = card ? 'Add Card' : 'Add Board';

    const renderAddButton = () => {
        return <button onClick={onToggleForm}>{buttonTitle}</button>
    }

    const renderAddForm = () => {

        const placeholder = card
            ? 'Enter Card title...'
            : 'Enter a title for this Board...';        

        return <form
            onSubmit={(e) => {
                card
                    ? onSubmitCardButton(e)
                    : onSubmitBoardButton(e)
            }}
        // onBlur={onToggleForm}
        >

            <textarea
                type='text'
                placeholder={placeholder}
                onChange={onTextareaChange}
                value={textareaValue}
            />

            <button
                className='btn'
                type='submit'>
                {buttonTitle}
            </button>

        </form>
    }

    const onToggleForm = () => {
        setFormState(!formState);
    }

    const onTextareaChange = e => {
        e.preventDefault();
        setTextareaValue(e.target.value);
    }

    const onSubmitBoardButton = e => {
        e.preventDefault();
        onAddBoard(textareaValue);
        setTextareaValue('');
        onToggleForm();

    }

    const onSubmitCardButton = e => {
        e.preventDefault();
        onAddCard(stateBoardIndex, textareaValue);
        setTextareaValue('');
        onToggleForm();

    }

    return (
        formState ? renderAddForm() : renderAddButton()
    )

}

export default AddButton;