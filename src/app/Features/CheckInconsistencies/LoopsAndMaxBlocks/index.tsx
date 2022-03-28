import { BaseFeature } from '../../BaseFeature';
import { getFlow } from '~/Utils';
import * as React from 'react';
import { Paragraph } from '~/Components';

const MAX_STATES_WITHOUT_INPUT = 35;

export class CheckLoopsOnFlow extends BaseFeature {
  public static isUserTriggered = true;
  public static shouldRunOnce = true;

  /**
   * Check for Loops and Max blocks cascade without input
   */
  public handle(): any {
    return this.startSearchingForFlowLoops(getFlow());
  }

  private startSearchingForFlowLoops = (flow): any => {
    let loopBlocks = new Set<string>();
    let BlocksWithoutInputCount = 0;
    let message;
    let hasInconsistencies = false;

    for (const blockId of Object.keys(flow)) {
      const block = flow[blockId];
      const hasInput = this.getStateInput(block);
      if (!hasInput) {
        for (const output of this.getStateOutputs(block)) {
          loopBlocks.clear();
          BlocksWithoutInputCount = 0;
          const loopFlowSet = this.hasStateLoop(
            flow,
            block,
            output,
            loopBlocks,
            BlocksWithoutInputCount,
          );
          if (loopFlowSet.loopBlocksFound) {
            loopBlocks = loopFlowSet.loopBlocksFound;
            BlocksWithoutInputCount = loopFlowSet.count;
            break;
          }
        }
      }
      if (loopBlocks.size) {
        break;
      }
    }
    const loopBlocksFound = this.getListBlocks(loopBlocks, flow);
    if (BlocksWithoutInputCount >= MAX_STATES_WITHOUT_INPUT) {
      hasInconsistencies = true;
      message = this.getMaxBlocksCascadeMessage(loopBlocksFound);
    } else if (loopBlocksFound.length > 0) {
      hasInconsistencies = true;
      message = this.getLoopMessage(loopBlocksFound);
    } else {
      hasInconsistencies = false;
      message = this.getSuccessMessage();
    }

    return { loopMessage: message, hasLoop: hasInconsistencies };
  };

  private getLoopMessage = (list: string[]): any => {
    return (
      <>
        <h4>Loops no Fluxo</h4>
        <Paragraph>Foi encontrado o seguinte Loop no fluxo:</Paragraph>

        {this.getHtmlList(list)}

        <Paragraph>
          * Você deve alterar as condições de saída de algum destes blocos para
          evitar o possível loop.
          <br />* Lembre de verificar a condição de saída padrão dos blocos.
        </Paragraph>
      </>
    );
  };

  private getMaxBlocksCascadeMessage = (list: string[]): any => {
    return (
      <>
        <h4>Loops no Fluxo</h4>
        <Paragraph>
          Foi encontrado a seguinte cascata de blocos sem input do usuário no
          fluxo:
        </Paragraph>

        {this.getHtmlList(list)}

        <Paragraph>
          * Você deve remover blocos nesta cascata ou adicionar uma espera por
          input do usuário. Não pode existir uma cascata com mais de 35 blocos
          sem input do usuário.
        </Paragraph>
      </>
    );
  };

  private getSuccessMessage = (): any => {
    return (
      <>
        <h4>Loops no Fluxo</h4>
        <Paragraph>Nenhum Loop ou excesso de blocos identificado.</Paragraph>
      </>
    );
  };

  private getHtmlList = (list: string[]): any => {
    return (
      <ul
        style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#607b99' }}
      >
        {list.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    );
  };

  private getListBlocks = (loopBlocksSet: Set<string>, flow: any): string[] => {
    const loopBlocksList = Array.from(loopBlocksSet);

    if (loopBlocksList.length > 0) {
      return [...loopBlocksList, loopBlocksList[0]].map(
        (c) => `${flow[c]?.$title}`,
      );
    }
    return [];
  };

  /**
   * recursive function that detects loops in the flow starting from a given block
   * @param flow The builder flow
   * @param state the current block
   * @param output the next block to be visited
   * @param loopBlocks Set of string with blocks ids in the loop
   * @param count The number of blocks in the loop
   * @returns
   */
  private hasStateLoop = (
    flow: any,
    state: any,
    output: any,
    loopBlocks: Set<string>,
    count: number,
  ): any => {
    loopBlocks = new Set(loopBlocks);
    if (count >= MAX_STATES_WITHOUT_INPUT) {
      return { loopBlocksFound: loopBlocks, count };
    }
    if (Array.from(loopBlocks).some((s) => s === output.stateId)) {
      return false;
    }
    const outputBlock = flow[output.stateId];
    const outputsOfOutputBlock = this.getStateOutputs(outputBlock);
    if (!outputsOfOutputBlock || outputsOfOutputBlock.length === 0) {
      return false;
    }
    const hasInput = this.getStateInput(outputBlock);
    if (hasInput) {
      return false;
    }
    if (outputsOfOutputBlock.some((o) => o.stateId === state.id)) {
      loopBlocks.add(output.stateId);
      loopBlocks.add(state.id);
      count += 2;
      return { loopBlocksFound: loopBlocks, count };
    }
    loopBlocks.add(output.stateId);
    ++count;
    let nextLoopBlocks;
    if (
      outputsOfOutputBlock.some((o) => {
        nextLoopBlocks = this.hasStateLoop(flow, state, o, loopBlocks, count);
        return nextLoopBlocks;
      })
    ) {
      return nextLoopBlocks;
    }
    return false;
  };

  private getStateInput = (state): any => {
    return state.$contentActions.find((a) => a.input && !a.input.bypass);
  };

  private getStateOutputs = (state): any => {
    let outputs = state.$conditionOutputs;
    if (state.$defaultOutput) {
      outputs = [...(outputs || []), state.$defaultOutput];
    }
    return outputs;
  };
}
