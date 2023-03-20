import {Button} from "@chakra-ui/react";
import NextLink from "next/link";
import {ArrowForwardIcon} from "@chakra-ui/icons";

interface LinkToNextProps {
    label?: string;
    title?: string;
    color?: string;
}

const LinkToNext = ({
    label,
    title,
    color
                    }: LinkToNextProps) => {
    return (
            <NextLink href={`/${label}`} passHref>
              <Button as={'a'} fontWeight={'700'} fontSize={'1.2rem'} padding={'1rem'} borderRadius={'10px'} backgroundColor={color || 'black'} rightIcon={<ArrowForwardIcon/>}>
                {title || "Next Page"}
              </Button>
            </NextLink>
    );
}

export default LinkToNext
