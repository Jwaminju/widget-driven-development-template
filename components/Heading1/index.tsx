import {Heading} from "@chakra-ui/react";

interface Heading1Props {
    label: string;
    size?: string;
}

const Heading1 = ({
  label,
  size = 'xl'
                  }: Heading1Props) => {
    return(
      <Heading as='h1' size={size}>
        {label}
      </Heading>
    );
}

export default Heading1
