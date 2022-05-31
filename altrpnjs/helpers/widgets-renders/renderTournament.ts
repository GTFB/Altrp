import getResponsiveSetting from '../getResponsiveSetting';
import * as _ from 'lodash'

export default function renderTournament(settings, device, context) {
  const {data, headers} = _.get(getResponsiveSetting(settings, 'path', device), context, {data: [], headers: []})

  if (!data?.length) {
    return 'No data'
  }

  const rounds : any = []

  let matches : any = []
  data.sort((a, b) => a?.round - b?.round).forEach((el, i) => {
    if (i !== 0) {
      if (data[i - 1]?.round === el?.round) {
        return matches.push(el)
      }
      matches = matches.sort((a, b) => a.match - b.match)
      rounds.push(matches)
      matches = [el]
      return
    }

    matches.push(el)
  })

  rounds.push(matches.sort((a, b) => a.match - b.match))

  return `
      <div class="reacket">
          <div class="reacket-round-headers">
            ${rounds.map((round, i) => `
              <div class="reacket-round-header ${rounds.length === i ? 'reacket-last-round' : ''}">
                ${headers?.length ? headers[i] || ' ' : (() => {
                  if (rounds.length - 1 === i) {
                    return 'Finals'
                  }
                  if (rounds.length - 2 === i) {
                    return 'Semi-finals'
                  }
                  return `Round ${round[0]?.round}`
                })()}
              </div>
            `)}
          </div>
          <div class="reacket-rounds">
            ${rounds.map(round => `
              <div class="reacket-round">
                ${round.map(match => `
                  ${match?.round === 1 ? '' : `
                    <div class="reacket-spacer ">&nbsp;</div>
                  `}

                  <div class="reacket-match">
                    <div class="reacket-match-id">${match.id || ' '}</div>
                    <div class="reacket-players">
                      ${match.players.map((player, i) => {
                        const winnerIdx = match.score[0] > match.score[1] ? 0 : 1
                        return `
                          <div class="reacket-player ${winnerIdx === i ? 'reacket-winner' : ''}">
                            <div title="Seed" class="reacket-player-seed">${player.seed}</div>
                            ${player.image ? `
                              <img class="reacket-player-image" src="${player.image}" />
                            ` : ''}
                            <div class="reacket-player-name">${player.name}</div>
                            <div class="reacket-player-score">${match.score[i]}</div>
                          </div>
                        `
                      }).join('')}
                    </div>
                  </div>

                  ${match?.round === 1 ? '' : `
                    <div class="reacket-spacer ">&nbsp;</div>
                  `}
                `).join('')}
              </div>
              ${round[0]?.round === rounds.length ? '' : `
                <div class="reacket-connectors">
                  <div data-test="connector-left" class="reacket-connector">
                    ${(new Array(Math.ceil(round.length / 2))).fill(1).map(() => `
                      <div class="reacket-spacer ">&nbsp;</div>
                      <div class="reacket-horizontal-line"></div>
                      <div class="reacket-spacer reacket-vertical-line">&nbsp;</div>
                      <div class="reacket-spacer reacket-vertical-line">&nbsp;</div>
                      <div class="reacket-horizontal-line"></div>
                      <div class="reacket-spacer ">&nbsp;</div>
                    `).join('')}
                  </div>
                  <div data-test="connector-right" class="reacket-connector">
                    ${(new Array(Math.ceil(round.length / 2))).fill(1).map(() => `
                      <div class="reacket-spacer">&nbsp;</div>
                      <div class="reacket-horizontal-line"></div>
                      <div class="reacket-spacer">&nbsp;</div>
                    `).join('')}
                  </div>
                </div>
              `}
            `).join('')}
          </div>
      </div>
  `
}
