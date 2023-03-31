import {Stat, StatArrow, StatHelpText, StatLabel, StatNumber} from "@chakra-ui/stat";

interface Props {
    label: string;
    statNumber: number;
    changeRate: number;
}
const DisplayedStatNumber = (label: string, statNum: number): string => {
  if (label !== "GreenHouseEffect") {
    const statNumberInPPM = statNum * 10000;
    const indicatorNumber = statNumberInPPM.toFixed(5);
    return indicatorNumber + "(ppm)";
  }
  return statNum.toFixed(5) + "%";
}
const StatIndicator = ({
  label,
  statNumber,
  changeRate
                       }: Props) => {
  let displayedStatNumber = "";


  return (
      <Stat variant={"great"}>
          <StatLabel>{label.toUpperCase()}</StatLabel>
          <StatNumber>{DisplayedStatNumber(label, statNumber)}</StatNumber>
          <StatHelpText>
              <StatArrow type={changeRate >= 0 ? "increase" : "decrease"} />
              {changeRate.toFixed(3)+'%'}
          </StatHelpText>
      </Stat>
    )
}

export default StatIndicator
