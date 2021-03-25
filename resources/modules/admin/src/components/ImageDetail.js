import React from 'react';
import { Form, Field } from 'react-final-form';

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
            <div className="media-modal-content" role="document">
                <div className="edit-attachment-frame">
                    <div className="edit-media-header">
                        <button class="left dashicons" disabled=""><span class="screen-reader-text">Редактировать предыдущий файл</span></button>
                        <button class="right dashicons" disabled=""><span class="screen-reader-text">Редактировать следующий файл</span></button>
                        <button type="button" class="media-modal-close"><span class="media-modal-icon"><span class="screen-reader-text">Закрыть окно</span></span></button>
                    </div>
                    <div className="media-frame-title"><h1>Информация о вложении {description}</h1></div>
                    <Form initialValues={this.state} onSubmit={this.updateAsset}>
                        {props => (
                            <form onSubmit={props.handleSubmit}>
                                <Field
                                    name="description"
                                    label="Description"
                                    component="input"
                                    type="text"
                                />
                                <Field
                                    name="alternate_text"
                                    label="alt"
                                    component="input"
                                    type="text"
                                />
                                <button type="submit">Добавить</button>
                            </form>
                        )}
                    </Form>
                    <div className="media-frame-content">
                        <div className="attachment-details">
                            <div className="attachment-media-view">
                                <h2 className="screen-reader-text">Предварительный просмотр вложения</h2>
                                <div className="thumbnail">
                                    <img class="details-image" src={url} draggable="false" alt="" />
                                    <div class="attachment-actions">
                                        <button type="button" class="button">Редактировать</button>
                                    </div>
                                </div>
                            </div>
                            <div className="attachment-info">
                                <span class="settings-save-status" role="status">
                                    <span class="spinner"></span>
                                    <span class="saved">Сохранено.</span>
                                </span>
                                <div class="details">
                                    <h2 class="screen-reader-text">Подробности</h2>
                                    <div class="uploaded"><strong>Загружен:</strong> 24.03.2021</div>
                                    <div class="uploaded-by">
                                        <strong>Загружено:</strong>
                                        <a href="http://wp.demo.com/wp-admin/profile.php">stas</a>
                                    </div>
                                    <div class="filename"><strong>Имя файла:</strong> Без-названия.jpeg</div>
                                    <div class="file-type"><strong>Тип файла:</strong> image/jpeg</div>
                                    <div class="file-size"><strong>Размер файла:</strong> 7 КБ</div>
                                    <div class="dimensions"><strong>Размеры:</strong>200 на 200 пикселей</div>
                                    <div class="compat-meta"></div>
                                </div>
                                <div class="settings">
                                    <span class="setting has-description" data-setting="alt">
                                        <label for="attachment-details-two-column-alt-text" class="name">Атрибут alt</label>
                                        <input type="text" id="attachment-details-two-column-alt-text" value="" aria-describedby="alt-text-description" />
                                    </span>
                                    <p class="description" id="alt-text-description"><a href="https://www.w3.org/WAI/tutorials/images/decision-tree" target="_blank" rel="noopener">Опишите назначение изображения<span class="screen-reader-text"> (откроется в новой вкладке)</span></a>. Оставьте пустым, если изображение является только элементом декора.</p>
                                    <span class="setting" data-setting="title">
                                        <label for="attachment-details-two-column-title" class="name">Заголовок</label>
                                        <input type="text" id="attachment-details-two-column-title" value="Без названия" />
                                    </span>
                                    <span class="setting" data-setting="caption">
                                        <label for="attachment-details-two-column-caption" class="name">Подпись</label>
                                        <textarea id="attachment-details-two-column-caption"></textarea>
                                    </span>
                                    <span class="setting" data-setting="description">
                                        <label for="attachment-details-two-column-description" class="name">Описание</label>
                                        <textarea id="attachment-details-two-column-description"></textarea>
                                    </span>
                                    <span class="setting" data-setting="url">
                                        <label for="attachment-details-two-column-copy-link" class="name">Ссылка на файл:</label>
                                        <input type="text" class="attachment-details-copy-link" id="attachment-details-two-column-copy-link" value="http://wp.demo.com/wp-content/uploads/2021/03/Без-названия.jpeg" readonly="" />
                                        <span class="copy-to-clipboard-container">
                                            <button type="button" class="button button-small copy-attachment-url" data-clipboard-target="#attachment-details-two-column-copy-link">Скопировать URL в буфер обмена</button>
                                            <span class="success hidden" aria-hidden="true">Скопировано!</span>
                                        </span>
                                    </span>
                                    <div class="attachment-compat"><form class="compat-item"></form></div>
                                </div>
                                <div class="actions">
                                    <a class="view-attachment" href="http://wp.demo.com/%d0%b1%d0%b5%d0%b7-%d0%bd%d0%b0%d0%b7%d0%b2%d0%b0%d0%bd%d0%b8%d1%8f/">Просмотреть страницу вложения</a>
                                    <span class="links-separator">|</span>

                                    <a href="http://wp.demo.com/wp-admin/post.php?post=5&amp;action=edit">Изменить другие детали</a>



                                    <span class="links-separator">|</span>

                                    <button type="button" class="button-link delete-attachment">Удалить навсегда</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}