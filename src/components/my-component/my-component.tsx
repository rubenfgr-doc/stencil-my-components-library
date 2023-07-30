import { Component, Element, Event, EventEmitter, Listen, Method, Prop, State, Watch, h } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  /**
   * Esta propiedad no será expuesta y solo se utiliza internamente
   */
  @State() internal: string;

  @Watch('first')
  watchFirstHandler(newValue: boolean, oldValue: boolean) {
    console.log('[my-component.tsx] @Prop() first, valor anterior: ', oldValue);
    console.log('[my-component.tsx] @Prop() first, nuevo valor: ', newValue);
  }

  @Watch('internal')
  watchInternalHandler(newValue: boolean, oldValue: boolean) {
    console.log('[my-component.tsx] @State() internal, valor anterior: ', oldValue);
    console.log('[my-component.tsx] @State() internal, nuevo valor: ', newValue);
  }

  @Element() hostEl: HTMLElement;

  @Method()
  async getMessage() {
    return 'Hello from my-component exposed method';
  }

  @Event() onMessage: EventEmitter<string>;

  @Listen('onMessage')
  onMessageEventHandler(event: CustomEvent<string>) {
    console.log('[my-component.tsx] Evento onMessage recibido, propiedad event.detail: ', event.detail);
  }

  constructor() {
    console.log('[my-component.tsx] hostEl', this.hostEl);

    let counter = 0;

    setTimeout(() => {
      this.onMessage.emit('Mensage con contador: ' + counter);
      counter++;
    }, 3000);
  }

  connectedCallback() {
    console.log('connectedCallback()');
  }

  disconnectedCallback() {
    console.log('disconnectedCallback()');
  }

  componentWillLoad() {
    console.log('componentWillLoad()');
  }

  componentDidLoad() {
    console.log('componentDidLoad()');
  }

  componentShouldUpdate() {
    console.log('componentShouldUpdate()');
  }

  componentWillRender() {
    console.log('componentWillRender()');
  }

  componentDidRender() {
    console.log('componentDidRender()');
  }

  componentWillUpdate() {
    console.log('componentWillUpdate()');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate()');
  }

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return <div>Hello, World! I'm {this.getText()}</div>;
  }
}
