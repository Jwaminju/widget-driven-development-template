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
  const statNumberInPPM = statNumber * 10000;
  const indicatorNumber = (label === "Cfcs" ? statNumberInPPM.toFixed(10) : statNumberInPPM);
  return (
      <Stat variant={"great"}>
          <StatLabel>{label.toUpperCase()}</StatLabel>
          <StatNumber>{indicatorNumber}</StatNumber>
          <StatHelpText>
              <StatArrow type={changeRate >= 0 ? "increase" : "decrease"} />
              {changeRate+'%'}
          </StatHelpText>
      </Stat>
    )
}

export default StatIndicator
