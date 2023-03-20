import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from "@chakra-ui/react";

interface TextModalProps {
  textContent: string;
}

const TextModal = ({
  textContent
                   }: TextModalProps) => {
  const useTextModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return {
      isOpened
    }
  }

  const { isOpened, showStory, moveToNextPage } = useTextModal();
    return (
      <>
        <Button onClick={showStory}>See the Story</Button>
        <Modal isOpen={isOpened} onClose={moveToNextPage}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Earth is getting Hot...</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize={'md'}>
                {textContent}
              </Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
}

export default TextModal
