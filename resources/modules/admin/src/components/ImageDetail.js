import React from 'react';
import { Form, Field } from 'react-final-form';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CloseIcon from '@material-ui/icons/Close';

export class ImageDetail extends React.Component {
    state = {}

    componentDidUpdate(prevProps) {
        if (prevProps.imageId !== this.props.imageId && this.props.imageId !== null) {
            this.props.getAsset(this.props.imageId).then(data => this.setState(data))
        }
    }

    updateAsset = (formData) => {
        this.props.updateAsset(this.props.imageId, formData)
    }

    render() {
        const { url, description } = this.state

        return (
            <div className="image-detail">
                <div className="image-detail_header">
                    <div className="image-detail__title">Информация о вложении {description}</div>
                    <div className="image-detail__btn-nav-group">
                        <button className="image-detail__btn-nav"><ArrowBackIosIcon fontSize="small" /></button>
                        <button className="image-detail__btn-nav"><ArrowForwardIosIcon fontSize="small" /></button>
                        <button className="image-detail__btn-nav image-detail__btn-nav_close"><CloseIcon fontSize="small" /></button>
                    </div>
                </div>
                <div className="image-detail__content">
                    <div className="image-detail__image-display">
                        <img className="image-detail__image" src={url} draggable="false" alt="" />
                        <button className="image-detail__btn">Редактировать</button>
                    </div>
                    <div className="image-detail__editing-section">
                        <div className="image-detail__image-data-wrap">
                            <div className="image-detail__image-data">
                                <div>Загружен: <span className="image-detail__image-data-result">24.03.2021</span></div>
                                <div>Загружено: <span className="image-detail__image-data-result">Stas</span></div>
                                <div>Имя файла: <span className="image-detail__image-data-result">Без-названия.jpeg</span></div>
                                <div>Тип файла: <span className="image-detail__image-data-result">image/jpeg</span></div>
                                <div>Размер файла: <span className="image-detail__image-data-result">7 КБ</span></div>
                                <div>Размеры: <span className="image-detail__image-data-result">200 на 200 пикселей</span></div>
                            </div>
                        </div>
                        <Form initialValues={this.state} onSubmit={this.updateAsset}>
                            {props => (
                                <form onSubmit={props.handleSubmit}>
                                    <div className="image-detail__line-to-change"><span className="image-detail__name-of-changes">Атрибут alt</span><Field
                                        name="alternate_text"
                                        label="Alt"
                                        component="input"
                                        type="text"
                                        className="image-detail__input"
                                    /></div>
                                    <div className="image-detail__line-to-change"><span className="image-detail__name-of-changes">Заголовок</span><Field
                                        name="title"
                                        label="Title"
                                        component="input"
                                        type="text"
                                        className="image-detail__input"
                                    /></div>
                                    <div className="image-detail__line-to-change"><span className="image-detail__name-of-changes">Подпись</span><Field
                                        name="caption"
                                        label="Caption"
                                        component="textarea"
                                        type="text"
                                        className="image-detail__textarea"
                                    /></div>
                                    <div className="image-detail__line-to-change"><span className="image-detail__name-of-changes">Описание</span><Field
                                        name="description"
                                        label="Description"
                                        component="textarea"
                                        type="text"
                                        className="image-detail__textarea"
                                    /></div>
                                    <div className="image-detail__line-to-change"><span className="image-detail__name-of-changes">Ссылка на файл:</span><Field
                                        name="url"
                                        label="File URL"
                                        component="input"
                                        type="text"
                                        className="image-detail__input"
                                    /></div>
                                    <div><button className="image-detail__btn image-detail__btn-copy-url">Скопировать URL в буфер обмена</button></div>
                                    <div><button type="submit">Добавить</button></div>
                                </form >
                            )
                            }
                        </Form>
                    </div >
                </div >
            </div >
        )
    }
}