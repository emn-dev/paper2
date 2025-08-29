/* eslint-disable */
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import { addMatchImageSnapshotCommand } from "../snapshots-util/command";

declare type DragPoint = { x: number; y: number };

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Simulate click-drag mouse events from {@link from} to {@link to}.
       * @example
       * cy.get('canvas').drag({ x: 1, y: 1}, {x: 20, y: 20});
       */
      drag(
        from: DragPoint,
        to: DragPoint,
        mouseOptions?: Partial<MouseEvent>
      ): Chainable<void>;
    }
  }
}

addMatchImageSnapshotCommand({
  // failureThreshold: 0.03, // threshold for entire image
  // failureThresholdType: 'percent', // percent of image or number of pixels
  customDiffConfig: { threshold: 0.5 }, // threshold for each pixel
  // capture: 'viewport', // capture viewport in screenshot
  customSnapshotsDir: "./snapshots/tests",
  customDiffDir: "./diff_output",
});

/**
 *  Generate points (how many is based on {@param numIncrements}) that linearly progress from start to end.
 */
function* interpolate(numIncrements: number, start: DragPoint, end: DragPoint) {
  const { x: startX, y: startY } = start;
  const { x: endX, y: endY } = end;
  const { x, y }: DragPoint = { x: endX - startX, y: endY - startY };
  const xIncrement = x / numIncrements;
  const yIncrement = y / numIncrements;
  let i = 1;
  while (i <= numIncrements) {
    yield {
      x: startX + xIncrement * i,
      y: startY + yIncrement * i,
    } as DragPoint;
    i += 1;
  }
}

Cypress.Commands.add(
  "drag",
  { prevSubject: true },
  (
    subject,
    from: DragPoint,
    to: DragPoint,
    mouseOptions: Partial<MouseEvent> = {}
  ) => {
    const intermediatePoints = Array.from(interpolate(3, from, to));
    const { x: startX, y: startY } = from;
    // need one mouse move "in place" for some actions to work like the real world
    let wrapped = cy.wrap(subject).trigger("mousemove", startX, startY, {
      eventConstructor: "MouseEvent",
      ...mouseOptions,
    });
    for (const point of intermediatePoints) {
      const { x, y } = point;
      wrapped = wrapped.trigger("mousemove", x, y, {
        eventConstructor: "MouseEvent",
        ...mouseOptions,
      });
    }
  }
);
