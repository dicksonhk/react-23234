import React from "react";
import ReactDOM from "react-dom";
// import Switch from "./Switch";
import Switch, {SwitchProps} from "./Switch";

import "./reset.css";
import "./app-global.css";
// @ts-ignore
import styles from "./app.module.css";

interface ConfigItemState<T> {
    enabled: boolean;
    value: T | undefined;
}

type State<T = Required<SwitchProps>> = {
    switch: {
        [P in keyof T]: ConfigItemState<T[P]>;
    };
};

const Layout = ({renderArea, configArea}: {renderArea: React.ReactNode; configArea: React.ReactNode}) => (
    <div
        style={{
            display: "flex",
            height: "100%",
            minHeight: "100%",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <section
            className={styles.mainWrapper}
            style={{
                backgroundColor: "var(--card-background-color)",
                padding: "1.75rem 1.25rem",
                borderRadius: "0.75rem",
                height: "100%",
                minHeight: "100%",
                maxHeight: "100%",
                width: "100%",
                maxWidth: "1600px",
                display: "grid",
                gap: "1.5rem",
            }}
        >
            <div
                style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    textAlign: "start",
                    opacity: 0.75,
                    textTransform: "uppercase",
                }}
            >
                <span>Switch component demo</span>
            </div>
            <div
                className="render-area"
                style={{
                    display: "grid",
                    gap: ".75rem",
                    backgroundColor: "#292929",
                    borderRadius: "0.5rem",
                    padding: "2rem 0.75rem",
                    userSelect: "none",
                    zIndex: 1,
                }}
            >
                <div
                    style={{
                        marginTop: "-1rem",
                        fontSize: "0.625rem",
                        fontWeight: "bold",
                        fontStyle: "italic",
                        textAlign: "start",
                        opacity: 0.5,
                    }}
                >
                    RENDERED RESULT
                </div>
                {renderArea || <></>}
            </div>
            <div
                className="config-area"
                style={{
                    display: "grid",
                    gap: ".75rem",
                    backgroundColor: "#292929",
                    borderRadius: "0.5rem",
                    padding: "2rem 0.75rem",
                    userSelect: "none",
                    height: "100%",
                }}
            >
                <div
                    style={{
                        marginTop: "-1rem",
                        fontSize: "0.625rem",
                        fontWeight: "bold",
                        fontStyle: "italic",
                        textAlign: "start",
                        opacity: 0.5,
                    }}
                >
                    CONFIG
                </div>
                {configArea || <></>}
            </div>
        </section>
    </div>
);

const ConfigItem = <T extends any>({
    name,
    state,
    onStateChanged,
}: {
    //
    name: string;
    state: ConfigItemState<T>;
    onStateChanged: (updatedState: typeof state) => void;
}) => {
    const {enabled, value} = state;
    return (
        <div className={styles.configItem} {...(!!enabled && {"data-enabled": ""})}>
            <div className={styles.configItem__header}>
                <label className={styles.configItem__toggle}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <span>{name}</span>
                        {name === "checked" ? (
                            <i style={{fontFamily: "monospace", opacity: 0.3625}}>
                                &nbsp;[{typeof value}]({value + ""})
                            </i>
                        ) : (
                            <></>
                        )}
                    </div>
                    <Switch
                        checked={!!enabled}
                        onChange={(checked) =>
                            onStateChanged({
                                ...state,
                                enabled: checked,
                            })
                        }
                    />
                </label>
            </div>
            {["boolean", "string"].indexOf(typeof value) !== -1 ? (
                <div className={styles.configItem__body}>
                    <div className={styles.configItem__value}>
                        <span>value: </span>
                        {typeof value === "boolean" ? (
                            <label className={styles.configItem__value__booleanInput}>
                                <input
                                    //
                                    type="checkbox"
                                    checked={!!value}
                                    onChange={(e) =>
                                        onStateChanged({
                                            ...state,
                                            value: e.currentTarget.checked as any,
                                        })
                                    }
                                />
                                <span data-true="true" data-false="false" />
                            </label>
                        ) : typeof value === "string" ? (
                            <input
                                type="text"
                                className={styles.configItem__value__stringInput}
                                onChange={(e) =>
                                    onStateChanged({
                                        ...state,
                                        value: e.currentTarget.value as any,
                                    })
                                }
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

class App extends React.PureComponent<{}, State> {
    public state: State = {
        switch: {
            checked: {
                enabled: true,
                value: false,
            },
            onChange: {
                enabled: true,
                value: (value: boolean) => {
                    this.setState((prevState) => ({
                        ...prevState,
                        switch: {
                            ...prevState.switch,
                            checked: {...prevState.switch.checked, value},
                        },
                    }));
                },
            },

            ...(["defaultChecked", "required", "readOnly", "disabled"] as const).reduce(
                (props, key) => ({
                    ...props,
                    [key]: {
                        enabled: false,
                        value: true,
                    },
                }),
                {}
            ),
            ...(["id", "name", "value", "aria-describedby", "aria-label", "aria-labelledby"] as const).reduce(
                (props, key) => ({
                    ...props,
                    [key]: {
                        enabled: false,
                        value: "",
                    },
                }),
                {}
            ),
        } as any,
    };

    renderedContainerEl = React.createRef<HTMLDivElement>();
    renderedHtmlCodeEl = React.createRef<HTMLDivElement>();

    updateRenderedHhmlCode() {
        window.requestAnimationFrame(() => {
            if (this.renderedHtmlCodeEl.current) {
                this.renderedHtmlCodeEl.current.innerText = this.renderedContainerEl?.current?.innerHTML || "";
            }
        });
    }

    componentDidMount() {
        this.updateRenderedHhmlCode();
    }

    render() {
        return (
            <Layout
                renderArea={
                    <>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",

                                padding: "2rem 0",
                                // ts-lint-ignore
                                ["--switch-transition-duration" as any]: "500ms",
                            }}
                            ref={this.renderedContainerEl}
                        >
                            <Switch
                                id="switch"
                                key={JSON.stringify({
                                    checked: this.state.switch.checked.enabled,
                                    defaultChecked: this.state.switch.defaultChecked,
                                })} // re-render properly
                                {...Object.entries(this.state.switch).reduce(
                                    (props, [key, {enabled, value}]) => ({
                                        ...props,
                                        ...(enabled && {
                                            [key]: value,
                                        }),
                                    }),
                                    {}
                                )}
                            />
                        </div>
                        <div
                            className={styles.renderedHtmlCode}
                            style={{
                                display: "grid",
                                gap: ".75rem",
                                backgroundColor: "var(--card-background-color)",
                                borderRadius: "0.5rem",
                                padding: "2rem 0.75rem",
                                userSelect: "none",
                            }}
                        >
                            <div
                                style={{
                                    marginTop: "-1rem",
                                    fontSize: "0.625rem",
                                    fontWeight: "bold",
                                    fontStyle: "italic",
                                    textAlign: "start",
                                    opacity: 0.5,
                                }}
                            >
                                HTML
                            </div>
                            <code style={{fontStyle: "italic", fontSize: ".75rem", opacity: 0.5, wordBreak: "break-word"}} ref={this.renderedHtmlCodeEl}>
                                {this.renderedContainerEl?.current?.innerHTML}
                            </code>
                        </div>
                    </>
                }
                configArea={
                    <div>
                        <div
                            className={styles.configGrid}
                            style={{
                                display: "grid",
                                gap: "1.5rem",
                            }}
                        >
                            {Object.entries(this.state.switch).map(([name, state]) => (
                                <ConfigItem
                                    key={name}
                                    name={name}
                                    state={state as any}
                                    onStateChanged={(updatedState) => {
                                        this.setState(
                                            (prevState) => ({
                                                ...prevState,
                                                switch: {
                                                    ...prevState.switch,
                                                    [name]: {...updatedState},
                                                },
                                            }),
                                            this.updateRenderedHhmlCode
                                        );
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                }
            />
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app")!);
