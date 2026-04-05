import { useState } from 'react';
import { FAQ_DATA } from '../data/faq';

function Faq() {
    const [openId, setOpenId] = useState(null);

    const toggle = (id) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <section className="faq" id="faq" aria-labelledby="faq-title">
            <div className="container">
                <div className="section-header">
                    <span className="section-header__badge">常見問題</span>
                    <h2 id="faq-title" className="section-header__title">
                        還有其他問題？
                    </h2>
                    <p className="section-header__desc">
                        以下是客戶最常詢問的問題，若沒有找到答案，歡迎直接聯繫我們的客服團隊。
                    </p>
                </div>

                <div className="faq__list" role="list">
                    {FAQ_DATA.map((item) => {
                        const isOpen = openId === item.id;
                        return (
                            <div
                                key={item.id}
                                className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}
                                role="listitem"
                            >
                                <button
                                    className="faq__question"
                                    onClick={() => toggle(item.id)}
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-answer-${item.id}`}
                                >
                                    <span>{item.question}</span>
                                    <span className="faq__icon" aria-hidden="true">
                                        {isOpen ? '−' : '+'}
                                    </span>
                                </button>
                                <div
                                    id={`faq-answer-${item.id}`}
                                    className="faq__answer"
                                    style={{
                                        maxHeight: isOpen ? '500px' : '0',
                                        overflow: 'hidden',
                                        transition: 'max-height 0.3s ease',
                                    }}
                                >
                                    <p className="faq__answer-text">{item.answer}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Faq;