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
      <Stat>
          <StatLabel>{label}</StatLabel>
          <StatNumber>{statNumber}</StatNumber>
          <StatHelpText>
              <StatArrow type={changeRate >= 0 ? "increase" : "decrease"} />
              {changeRate+'%'}
          </StatHelpText>
      </Stat>
    )
}

export default StatIndicator
