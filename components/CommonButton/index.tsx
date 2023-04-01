import { Button } from "@chakra-ui/react";

interface Props {
    label: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const CommonButton = ({label, onClick}: Props) => {
    return <Button onClick={onClick}>{label}</Button>
}

export default CommonButton
