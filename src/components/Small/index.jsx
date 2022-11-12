const Small = ({ msg, type, classname }) => {
    let color = 'red';

    if (type === 'success') color = 'green';
    if (type === 'info') color = 'blue';

    const style = {
        color,
    };

    return (
        <small style={style} className={classname}>
            {msg}
        </small>
    );
};

export default Small;
