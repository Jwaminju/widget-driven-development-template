import {Link} from "@chakra-ui/react";
import NextLink from "next/link";

interface LinkToNextProps {
    label: string;
}

const LinkToNext = ({
    label
                    }: LinkToNextProps) => {
    return (
        <NextLink href={`/${label}`} passHref>
            <Link>{label}</Link>
        </NextLink>
    );
}

export default LinkToNext
