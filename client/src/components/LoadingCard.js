import { Skeleton, Card } from 'antd'
const { Meta } = Card;

const LoadingCard = ({ loading }) => {

    return (
        <Card
            style={{ width: 400, marginTop: 16, marginLeft: 10, marginRight: 10, display: 'inline-block' }}
        >
            <Skeleton loading={loading} avatar active>
                <Meta />
            </Skeleton>
        </Card>
    )
}

export default LoadingCard