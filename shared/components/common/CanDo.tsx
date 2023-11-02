import {useContext} from "react";
import {AbilityContext} from "@/pages/_app";

type Props = {
    canDo : string,
    subject : string,
    children : React.ReactNode
}
export const CanDo = ({canDo , subject , children} : Props) => {
    const ability = useContext(AbilityContext)
    return ability.can(canDo,subject) && children;
}
