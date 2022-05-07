import { Layout } from 'antd'

const { Footer } = Layout

const AppFooter = () => {
    return (
        <Footer>
            <div>
                <span>Tetras Schooling</span>
                <a style={{ margin: '5px' }} href="https://www.linkedin.com/in/spencer-creer-023246109/" target="_blank" rel="noreferrer">
                    <i className="fa fa-linkedin-square"></i>
                </a>
                <a href="https://github.com/spencercreer" target="_blank" rel="noreferrer">
                    <i className="fa fa-github"></i>
                </a>
            </div>
        </Footer>
    )
}

export default AppFooter