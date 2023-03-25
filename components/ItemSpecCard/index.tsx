import {  Text, Image, Badge, Button, Card, Stack, CardBody, CardFooter, Heading, } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

interface items {
        name: string;
        img: string;
        story: string;
        tier: number;
        valid_year: number;
};

interface itemsSpec {
    property: items;
};

const ItemSpecCard = ({property}:itemsSpec) => {
    return (

        <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
            <Image 
                objectFit='cover'
                maxW={{ base: '100%', sm: '20%'}}
                src={property.img}
                alt='Recycling Trash'/>
            <Stack>
                <CardBody>
                    <Badge colorScheme='teal' fontSize='md'>
                        {Array(4).fill('').map((_, i) => (
                            <StarIcon
                                key={i}
                                color={i < property.tier ? 'teal.500' : 'gray.300'}
                            />
                        ))}
                    </Badge>
                    <Badge colorScheme='red' fontSize='md' ml='1%' borderRadius='full' > Retention For {1} Year </Badge>
                    <Heading paddingTop='1%' size='md'> {property.name} </Heading>
                    <Text fontSize='lg' py='1%'> {property.story} </Text>
                </CardBody>
                <CardFooter>
                    <Button variant='solid' colorScheme='blue'> Select</Button>
                </CardFooter>
            </Stack>
        </Card>  
    )
}

export default ItemSpecCard

