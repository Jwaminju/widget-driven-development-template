import {Stat, StatHelpText, StatLabel, StatNumber} from "@chakra-ui/stat";

interface Props {
    playTime: number;
}

const Presenter = ({playTime}: Props) => {
    return (
      <Stat
        position={"fixed"}
        top={"5%"}
        right={"5%"}
        variant={"great"}
        zIndex={100}
        backgroundColor={"whiteAlpha.900"}
        padding={10}
        borderRadius={"50%"}
        boxShadow={"outline"}
      >
        <StatLabel>This Year is</StatLabel>
        <StatNumber>{playTime}</StatNumber>
        <StatHelpText>{`${2050-playTime} years left`}</StatHelpText>
      </Stat>
    )
}

export default Presenter
