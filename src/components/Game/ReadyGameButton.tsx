import { FC, MouseEventHandler, useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import gameBattleState from "../../recoil/atoms/gameBattleState";
import gameSoundState from "../../recoil/atoms/gameSoundState";
import { GameStatus } from "../../types/game";
import { getPlayerID, getPlayerName } from "../../utils/game";

interface ReadyGameButtonProps {
  status: GameStatus;
  player: string;
}

const ReadyGameButton: FC<ReadyGameButtonProps> = ({ status, player }) => {
  const { t } = useTranslation();
  const { sendReadyGame, sendUnReadyGame, allReady } =
    useRecoilValue(gameBattleState);
  const classReady = allReady.includes(player) ? "ready" : "";

  const onReady: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if ([GameStatus.PENDING, GameStatus.COMPLETED].includes(status)) {
        if (classReady === "ready") {
          sendUnReadyGame && sendUnReadyGame();
        } else {
          sendReadyGame && sendReadyGame();
        }
      } else if ([GameStatus.RUNNING, GameStatus.READY].includes(status)) {
        sendUnReadyGame && sendUnReadyGame();
      }
    },
    [sendReadyGame, sendUnReadyGame]
  );

  return (
    <>
      <div>
        <strong>{t("You")}:</strong>
        <span>
          {getPlayerName(player)} <em>(ID: {getPlayerID(player)})</em>
        </span>
      </div>
      <button className={`button-${status} ${classReady}`} onClick={onReady}>
        {[GameStatus.PENDING, GameStatus.COMPLETED].includes(status) &&
          t("Ready")}
        {[GameStatus.RUNNING, GameStatus.READY].includes(status) && t("Stop")}
      </button>
    </>
  );
};

export default ReadyGameButton;
