import {Button, Link} from "@chakra-ui/react";
import NextLink from "next/link";
import {ArrowForwardIcon} from "@chakra-ui/icons";

interface LinkToNextProps {
    label?: string;
}

const LinkToNext = ({
    label
                    }: LinkToNextProps) => {
    return (
            <NextLink href={`/${label}`} passHref>
              <Button as={'a'} fontWeight={'700'} fontSize={'1.2rem'} padding={'1rem'} borderRadius={'10px'} backgroundColor={'black'} rightIcon={<ArrowForwardIcon/>}>
                {label || "Next Page"}
              </Button>
            </NextLink>
    );
}

export default LinkToNext
