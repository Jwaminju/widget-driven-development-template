import { Button } from "@chakra-ui/react";

interface Props {
    label: string;
<<<<<<< HEAD
    onClick: () => any;
=======
    onClick: React.MouseEventHandler<HTMLButtonElement>;
>>>>>>> 77485259 (fix: the CommonButton Type error)
}

const CommonButton = ({label, onClick}: Props) => {
    return <Button onClick={onClick}>{label}</Button>
}

export default CommonButton
