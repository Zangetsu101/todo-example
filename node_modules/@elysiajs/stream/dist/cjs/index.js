"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stream = exports.wait = void 0;
const nanoid_1 = require("nanoid");
const encoder = new TextEncoder();
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
exports.wait = wait;
const isIterable = (value) => {
    if (!value)
        return false;
    return (typeof value[Symbol.asyncIterator] === 'function' ||
        typeof value[Symbol.iterator] === 'function');
};
class Stream {
    $passthrough = 'value';
    controller;
    stream;
    _retry;
    _event;
    label = '';
    labelUint8Array = new Uint8Array();
    composeLabel() {
        this.label = '';
        if (this._event)
            this.label += `event: ${this._event}\n`;
        if (this._retry)
            this.label += `retry: ${this._retry}\n`;
        if (this.label)
            this.labelUint8Array = encoder.encode(this.label);
    }
    get retry() {
        return this._retry;
    }
    set retry(retry) {
        this._retry = retry;
        this.composeLabel();
    }
    get event() {
        return this._event;
    }
    set event(event) {
        this._event = event;
        this.composeLabel();
    }
    static concatUintArray(a, b) {
        const arr = new Uint8Array(a.length + b.length);
        arr.set(a, 0);
        arr.set(b, a.length);
        return arr;
    }
    constructor(callback, { retry, event } = {}) {
        if (retry)
            this._retry = retry;
        if (event)
            this._event = event;
        if (retry || event)
            this.composeLabel();
        switch (typeof callback) {
            case 'function':
            case 'undefined':
                this.stream = new ReadableStream({
                    start: (controller) => {
                        this.controller = controller;
                        callback?.(this);
                    },
                    cancel: (controller) => {
                        controller.close();
                    }
                });
                break;
            default:
                this.stream = new ReadableStream({
                    start: async (controller) => {
                        this.controller = controller;
                        try {
                            for await (const chunk of await callback)
                                this.send(chunk);
                            controller.close();
                        }
                        catch {
                            if (callback instanceof Promise)
                                callback = await callback;
                            if (callback === null)
                                return controller.close();
                            const isResponse = callback instanceof Response;
                            if (isResponse ||
                                callback instanceof ReadableStream) {
                                const reader = isResponse
                                    ? callback.body?.getReader()
                                    : callback.getReader();
                                if (!reader)
                                    return controller.close();
                                while (true) {
                                    const { done, value } = await reader.read();
                                    this.send(value);
                                    if (done) {
                                        controller.close();
                                        break;
                                    }
                                }
                            }
                        }
                    }
                });
        }
    }
    send(data) {
        if (!this.controller || data === '' || data === undefined)
            return;
        if (data instanceof Uint8Array) {
            this.controller.enqueue(this.label
                ? Stream.concatUintArray(this.labelUint8Array, data)
                : data);
        }
        else
            this.controller.enqueue(encoder.encode(typeof data === 'string' && data.includes('id:')
                ? data +
                    (this._event && !data.includes('event:')
                        ? `\nevent: ${this._event}`
                        : '') +
                    (this._retry && !data.includes('retry:')
                        ? `\retry: ${this.retry}`
                        : '')
                : `id: ${(0, nanoid_1.nanoid)()}\n${this.label}data: ${typeof data === 'object'
                    ? JSON.stringify(data)
                    : data}\n\n`));
    }
    close() {
        this.controller?.close();
    }
    wait = exports.wait;
    get value() {
        return this.stream;
    }
}
exports.Stream = Stream;
exports.default = Stream;
