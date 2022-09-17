import tap from 'tap'
import sinon from 'sinon'

class F {
    first: any[]
    second: any[]
    third: any[]
    constructor () {
        this.first = []
        this.second = []
        this.third = []
    }
    async run () {
        await this.execute('first');
        await Promise.resolve();
        await this.execute('second');
        await Promise.resolve();
        await this.execute('third');
    }
    async execute(s: 'first' | 'second' | 'third') {
        for (const f of this[s]) {
            await f();
        }
    }
}

tap.jobs = 2;

tap.test('test 1', async t => {
    const sinonSandbox = sinon.createSandbox();

    const f = new F();

    const a = sinonSandbox.spy();
    const b = sinonSandbox.spy();
    const c = sinonSandbox.spy();

    f.first.push(a);
    f.second.push(b);
    f.third.push(c);

    await f.run();

    t.ok(a.calledBefore(b));
    t.ok(b.calledBefore(c));

    t.ok(a.calledImmediatelyBefore(b));
    t.ok(b.calledImmediatelyBefore(c));

    t.end();
})

tap.test('test 2', async t => {
    const sinonSandbox = sinon.createSandbox();

    const f = new F();

    const a = sinonSandbox.spy();
    const b = sinonSandbox.spy();
    const c = sinonSandbox.spy();

    f.first.push(a);
    f.second.push(b);
    f.third.push(c);

    await f.run();

    t.ok(a.calledBefore(b));
    t.ok(b.calledBefore(c));

    t.ok(a.calledImmediatelyBefore(b));
    t.ok(b.calledImmediatelyBefore(c));

    t.end();
})