export const Product = (product) => {
    return (
        <div key={product.id}>
            <h4>{product.titulo}</h4>
            <p>${product.precio}</p>
        </div>
    );
};