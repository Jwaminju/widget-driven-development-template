import Heading1 from "../../components/Heading1";
import LinkToNext from "../../components/LinkToNext";

interface Props {
  sceneTitle: string;
  labelForLinkToNext: string;
}

const Presenter = ({
  sceneTitle,
  labelForLinkToNext
                   }: Props) => {
    return (
      <main>
          <Heading1 label={sceneTitle} />
          <LinkToNext label={labelForLinkToNext} />
      </main>
    );
}

export default Presenter
