import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const [imageURL, setImageURL] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  function viewImageHandler(imageLink: string): void {
    setImageURL(imageLink);
    onOpen();
  }

  return (
    <>
      <SimpleGrid columns={[1, 2, 3]} spacing={40}>
        {cards.map(card => {
          return (
            <Card key={card.id} data={card} viewImage={viewImageHandler} />
          );
        })}
      </SimpleGrid>

      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={imageURL} />
    </>
  );
}
