import React from "react";

import {pick, excludeUndefined} from "../utils";

// @ts-ignore
import styles from "./styles.module.css";

const keyofPropsFowarded = ["checked", "defaultChecked", "id", "name", "value", "required", "readOnly", "disabled", "aria-describedby", "aria-label", "aria-labelledby"] as const;

const keyofProps = ["onChange", ...keyofPropsFowarded] as const;

export type SwitchPropsForwarded = Partial<Pick<React.InputHTMLAttributes<HTMLInputElement>, typeof keyofPropsFowarded[number]>>;
export type SwitchProps = SwitchPropsForwarded & {
    onChange?: (checked: boolean) => void;
};

export type SwitchState = Partial<Pick<SwitchProps, "checked">>;

export default class Switch extends React.PureComponent<SwitchProps> {
    public state: SwitchState = {
        checked: this.props.checked != null ? this.props.checked : !!this.props.defaultChecked,
    };

    private handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const {currentTarget} = {...e};
        const {checked} = {...(e && e.currentTarget)};

        if (this.props.onChange instanceof Function) {
            try {
                this.props.onChange.call(currentTarget, checked);
            } catch (error) {
                if (process.env.NODE_ENV !== "production") {
                    console.error(error);
                }
            }
        }
    };

    render() {
        const {...forwardedProps} = excludeUndefined(pick(this.props, keyofPropsFowarded));
        return (
            <label
                className={styles.root}
                {...(this.props.id && {
                    htmlFor: this.props.id,
                })}
            >
                <input
                    className={styles.input}
                    type="checkbox"
                    // {...this.props.checked != null && {
                    //     checked: this.state.checked,
                    // }}
                    onChange={this.handleChange}
                    {...forwardedProps}
                />
                <span className={styles.track} aria-hidden="true">
                    <span className={styles.thumb} aria-hidden="true" />
                </span>
            </label>
        );
    }
}

export {Switch};
