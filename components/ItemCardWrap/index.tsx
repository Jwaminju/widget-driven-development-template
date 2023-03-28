import { Wrap, WrapItem, Tabs, TabList, Tab, TabPanels, TabPanel, useColorModeValue, SimpleGrid, Box, Container } from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { ItemDataInterface } from "../../data/items.interface";


interface Props {
    property: ItemDataInterface[];
    getCurrItem: (arg1?: any) => any;
    selected: number[];
}

// const CustomWrapItem = (group:ItemDataInterface[]) => {
    
//     return <>
//         <WrapItem padding='1%'>

//             {group.map((item, idx) => (
//                 // eslint-disable-next-line react/jsx-key
//                 <Avatar onClick={myClick.bind(this, props.property)} 
//                 size='2xl' name={props.property.name} src={props.property.img} p='1%' ml='1%'>
//                     <AvatarBadge boxSize='1.25em' bg='teal.300'> {props.property.tier} </AvatarBadge> 
//                 </Avatar>
//             ))}

//         </WrapItem> 
//     </>
// }

const ItemCardWrap = ({property, getCurrItem, selected}: Props) => {
    const myClick = (item:ItemDataInterface) => {
        getCurrItem(item)
    }
    console.log("ItemCardWrap selected", selected)
    // 데이터를 조회하면서, group에 따라 다른 [] , [], [] 로 나눈다. 
    // 각 그룹에 대해서 Avatar를 만들고 wrapItem으로 묶어서 전한다. 
    // 그것을 모아서 Wrap 으로 감싼다.
    return <>
        <Wrap spacing='8%' justify='center' > 
                    {Array(3).fill('').map((_, i) => (
                        <>
                        {selected && <WrapItem padding='1%' minW='30%'>

                        {property.filter((item)=> 
                                item.group===i+1 && item.tier <= selected[i] 
                                ).map((item, idx) => (
                            // eslint-disable-next-line react/jsx-key
                            <Avatar onClick={myClick.bind(this, item)} 
                            size='2xl' name={item.name} src={item.img} p='1%' ml='1%'>
                                <AvatarBadge boxSize='1.25em' bg='teal.300'> {item.tier} </AvatarBadge> 
                            </Avatar>
                        ))}

                        </WrapItem> }
                        </>
                    ))}
            </Wrap>
    </>
}

export default ItemCardWrap
