import React from "react";
import "./index.css";
import { uid } from "../utils";

// If you wanna implement by TypeScript (Advanced Requirement 1), then rename this file to index.tsx and remove index.jsx
// Otherwise, remove this file

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  unControlled?: boolean;
}

type SwitchState = Required<Pick<SwitchProps, "checked" | "disabled">>;

export default class Switch extends React.PureComponent<SwitchProps> {
  private readonly _id = uid();
  public state: SwitchState = {
    checked: !!this.props.checked,
    disabled: !!this.props.disabled,
  };
  public readonly inputRef = React.createRef<HTMLInputElement>();

  private handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    // if (!this.props.unControlled) {
    // }
    const target = event.currentTarget; // save SyntheticEvent in the function scope
    const { checked, disabled } = {
      ...target,
    };

    if (target) {
      this.setState(
        () => ({
          checked,
          disabled,
        }),
        this.emitChange
      );
    }
  };

  private emitChange(checked?: boolean) {
    if (this.props.onChange) {
      this.props.onChange(checked != null ? checked : this.state.checked);
    }
  }

  render() {
    return (
      <div className="comp-switch">
        <div className="comp-switch__inner">
          <input
            className="comp-switch__input"
            type="checkbox"
            id={this._id}
            name={this._id}
            disabled={!!this.props.disabled}
            onChange={this.handleChange}
            ref={this.inputRef}
            {...(this.props.unControlled
              ? {
                  defaultChecked: !!this.props.checked,
                }
              : {
                  checked: this.props.checked,
                })}
          />
          <label className="comp-switch__area" htmlFor={this._id}>
            <div className="comp-switch__track">
              <div className="comp-switch__track-on">
                <div className="comp-switch__track-on__bg" />
              </div>
            </div>
            <div className="comp-switch__knob" />
          </label>
        </div>
      </div>
    );
  }
}
