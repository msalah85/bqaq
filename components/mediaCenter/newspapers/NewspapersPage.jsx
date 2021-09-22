import Link from 'next/link'
import React from 'react'
import ReactImageFallback from 'react-image-fallback'
import { connect } from 'react-redux';

function NewspapersPage(props) {
    return (
        <div className='newsSection fade-in'>

            {
                props.quotesData?.map((news, index) => {
                    return (
                        <div className='newsSection__mc_newCard' key={index}>
                            <div className='newsSection__mc_newCard__rightSec'>
                                <ReactImageFallback
                                    src={news.coverUrl}
                                    fallbackImage="/assets/fallbacks/news-fallback-image.png"
                                    initialImage="/assets/fallbacks/news-fallback-image.png"
                                    alt="صورة الخبر"
                                />
                            </div>
                            <div className='newsSection__mc_newCard__leftSec'>
                                <div className='newsSection__mc_newCard__leftSec__title two-lines'>{news.title}</div>
                                <div className='newsSection__mc_newCard__leftSec__desc three-lines'>{news.subtitle}</div>
                                <Link
                                    // href='/who-we-are/scientist-praise/123'
                                    href={{
                                        pathname: '/media-center/newspapers/[id]',
                                        query: { id: news.postId },
                                    }}
                                >
                                    <a className='baqiq-gold-btn'>المزيد</a>
                                </Link>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}
const mapStateToProps = (state) => {
    return { quotesData: state.mediaCenter?.pageData?.containers?.quotes };
};

export default connect(mapStateToProps, {})(NewspapersPage);