import {Stat, StatArrow, StatHelpText, StatLabel, StatNumber} from "@chakra-ui/stat";

interface Props {
    label: string;
    statNumber: number;
    changeRate: number;
}

const StatIndicator = ({
  label,
  statNumber,
  changeRate
                       }: Props) => {
    return (
      <Stat variant={"great"}>
          <StatLabel>{label}</StatLabel>
          <StatNumber>{label === "cfcs" ? statNumber.toFixed(10) : statNumber}</StatNumber>
          <StatHelpText>
              <StatArrow type={changeRate >= 0 ? "increase" : "decrease"} />
              {changeRate+'%'}
          </StatHelpText>
      </Stat>
    )
}

export default StatIndicator
