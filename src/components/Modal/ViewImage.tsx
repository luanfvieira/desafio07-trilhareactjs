import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent
          mx="auto"
          w="auto"
          h="auto"
          maxW={['320px', '540px', '900px']}
          maxH={['360px', '440px', '600px']}
        >
          <ModalBody padding={0}>
            <Image src={imgUrl} maxH={300} maxW={900} />
          </ModalBody>
          <ModalFooter h="3rem" bg="pGray.800" borderBottomRadius="6px">
            <Link href={imgUrl} isExternal>
              Abrir original
            </Link>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
