import { Composition } from "remotion";
import { HederaMcp } from "./HederaMcp";
import { VerticalCut } from "./Vertical";
import { UseCaseShort, SHORTS } from "./Short";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="HederaMcp" component={HederaMcp} durationInFrames={1020} fps={30} width={1920} height={1080} />
      <Composition id="VerticalCut" component={VerticalCut} durationInFrames={780} fps={30} width={1080} height={1920} />
      {Object.entries(SHORTS).map(([key, props]) => (
        <Composition
          key={key}
          id={`Short-${key}`}
          component={UseCaseShort}
          durationInFrames={240}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={props}
        />
      ))}
    </>
  );
};
