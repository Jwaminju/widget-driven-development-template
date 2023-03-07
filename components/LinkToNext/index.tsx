import {Link} from "@chakra-ui/next-js";

interface LinkToNextProps {
    label: string;
}

const LinkToNext = ({
    label
                    }: LinkToNextProps) => {
    return (
        <Link href={'/Story'}>
            {label}
        </Link>
    );
}

export default LinkToNext
