import { render, screen } from '@testing-library/react';
import { Card } from './Card';

const data = {
  id: 2,
  title: 'Mens Cotton Jacket',
  price: 22.3,
  description:
    'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
  rating: {
    rate: 4.1,
    count: 259,
  },
};

describe('Card component', () => {
  it('Card render', () => {
    render(
      <Card
        id={data.id}
        title={data.title}
        description={data.description}
        price={data.price}
        category={data.category}
        rating={data.rating}
        image={data.image}
      />
    );

    expect(screen.getByText(/Mens Cotton Jacket/i)).toBeInTheDocument;
    expect(screen.getByText(/Slim-fitting style, contrast raglan long sleeve/i)).toBeInTheDocument;
    expect(screen.getByText(/men's clothing/i)).toBeInTheDocument;
    expect(screen.getByText(/22.3/i)).toBeInTheDocument;
    expect(screen.getByText(/4.1/i)).toBeInTheDocument;
    const image = document.querySelector('img') as HTMLImageElement;
    expect(image.src).toMatch(/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg/i);
  });
});
